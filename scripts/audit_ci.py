import sys
import os
import re
import json
import xml.etree.ElementTree as ET
from html.parser import HTMLParser

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
os.chdir(ROOT_DIR)

print(f"[CI AUDIT] Running Quality & Security Gates in: {ROOT_DIR}")
failures = []

def fail(msg):
    failures.append(msg)
    print(f"  [FAIL] {msg}")

def ok(msg):
    print(f"  [PASS] {msg}")

# 1. Zero Comments in Production Web Files
print("\n--- 1. Production Code Hygiene (Zero Comments Rule) ---")
# index.html
with open("index.html", "r", encoding="utf-8") as f:
    html_content = f.read()

html_comments = re.findall(r"<!--(.*?)-->", html_content, re.DOTALL)
if html_comments:
    fail(f"index.html contains {len(html_comments)} HTML comments! Production must be 100% comment-free.")
else:
    ok("index.html has 0 comments")

# style.css
with open("assets/css/style.css", "r", encoding="utf-8") as f:
    css_content = f.read()

css_comments = re.findall(r"/\*.*?\*/", css_content, re.DOTALL)
if css_comments:
    fail(f"assets/css/style.css contains {len(css_comments)} CSS comments! Production must be 100% comment-free.")
else:
    ok("assets/css/style.css has 0 comments")

# main.js (check standalone comment lines)
with open("assets/js/main.js", "r", encoding="utf-8") as f:
    js_lines = f.readlines()

js_comments = []
for idx, line in enumerate(js_lines):
    stripped = line.strip()
    if stripped.startswith("//") or stripped.startswith("/*") or (stripped.startswith("*") and not stripped.startswith("*=")):
        js_comments.append((idx + 1, stripped))

if js_comments:
    fail(f"assets/js/main.js contains {len(js_comments)} comment lines! First: {js_comments[0]}")
else:
    ok("assets/js/main.js has 0 comments")

# 2. Typography & Brand Standards
print("\n--- 2. Typography & Anti-Slop Production Standards ---")
if "\u2014" in html_content:
    fail("index.html contains em-dash (\u2014). Must use standard hyphen (-).")
elif "\u2013" in html_content:
    fail("index.html contains en-dash (\u2013). Must use standard hyphen (-).")
else:
    ok("Frameless typography: 0 em-dash / en-dash detected in index.html")

if "litbang" in html_content.lower():
    fail("index.html contains banned organization naming 'Litbang'. Must use 'Create and Compete (CnC) HIMTIKA'.")
else:
    ok("Brand integrity: 0 occurrences of 'Litbang'")

# 3. Asset Integrity Verification
print("\n--- 3. Asset & Link Integrity Verification ---")
class AssetExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.assets = set()

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        for key in ["src", "href"]:
            val = attr_dict.get(key)
            if isinstance(val, str):
                val_clean = val.strip()
                if val_clean and not val_clean.startswith(("http:", "https:", "#", "mailto:", "tel:", "data:", "javascript:")):
                    clean = val_clean.split("?")[0].split("#")[0]
                    if clean:
                        self.assets.add(clean)
        srcset_val = attr_dict.get("srcset")
        if isinstance(srcset_val, str):
            for item in srcset_val.split(","):
                cand = item.strip().split()[0]
                if cand and not cand.startswith(("http:", "https:", "data:")):
                    clean = cand.split("?")[0].split("#")[0]
                    if clean:
                        self.assets.add(clean)

parser = AssetExtractor()
parser.feed(html_content)

missing_assets = []
checked_count = 0
for asset in sorted(parser.assets):
    checked_count += 1
    file_path = os.path.join(ROOT_DIR, asset.replace("/", os.sep))
    if not os.path.exists(file_path):
        missing_assets.append(f"Missing file: {asset}")
    elif os.path.getsize(file_path) == 0:
        missing_assets.append(f"Empty 0-byte file: {asset}")

if missing_assets:
    for m in missing_assets:
        fail(m)
else:
    ok(f"All {checked_count} referenced local assets verified existing on disk (>0 bytes)")

# 4. Configuration & SEO Integrity
print("\n--- 4. Configuration & SEO Integrity ---")
# vercel.json
try:
    with open("vercel.json", "r", encoding="utf-8") as f:
        json.load(f)
    ok("vercel.json is valid JSON")
except Exception as e:
    fail(f"vercel.json JSON syntax error: {e}")

# sitemap.xml
try:
    ET.parse("sitemap.xml")
    ok("sitemap.xml is valid XML")
except Exception as e:
    fail(f"sitemap.xml XML parsing error: {e}")

# robots.txt
if os.path.exists("robots.txt") and os.path.getsize("robots.txt") > 0:
    ok("robots.txt exists and non-empty")
else:
    fail("robots.txt is missing or empty")

# 5. Secret & Credential Leak Scanning
print("\n--- 5. Security & Credential Leak Scanning ---")
secret_patterns = [
    (r"(?:api[_-]?key|auth[_-]?token|secret[_-]?key|access[_-]?token)\s*[:=]\s*['\"][a-zA-Z0-9_\-]{20,}['\"]", "Exposed API/Secret token"),
    (r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----", "Private key file content")
]

leaks_found = []
for target_file in ["index.html", "assets/css/style.css", "assets/js/main.js", "vercel.json"]:
    if os.path.exists(target_file):
        with open(target_file, "r", encoding="utf-8") as f:
            c = f.read()
        for pat, desc in secret_patterns:
            if re.search(pat, c, re.IGNORECASE):
                leaks_found.append(f"{target_file}: {desc}")

if leaks_found:
    for l in leaks_found:
        fail(l)
else:
    ok("0 sensitive credentials or unredacted secrets detected")

print("\n" + "="*50)
if failures:
    print(f"[CI AUDIT FAILED] Total issues: {len(failures)}")
    sys.exit(1)
else:
    print("[CI AUDIT PASSED] 100% Quality, Security, and Compliance standards met!")
    sys.exit(0)
