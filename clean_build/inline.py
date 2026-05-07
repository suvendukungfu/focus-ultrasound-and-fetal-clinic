import re
import os

html_path = 'dist/index.html'
with open(html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Find the JS script
script_match = re.search(r'<script [^>]*src="([^"]+)".*?</script>', html)
if script_match:
    js_src = script_match.group(1) # e.g. ./assets/index-C_hkYkHT.js
    js_path = os.path.join('dist', js_src.replace('./', ''))
    with open(js_path, 'r', encoding='utf-8') as f:
        js_content = f.read()
    # Replace the tag with inline script
    # We use type="module" just in case, it works inline on file://
    html = html.replace(script_match.group(0), f'<script type="module">\n{js_content}\n</script>')

# Find the CSS link
css_match = re.search(r'<link [^>]*href="([^"]+)".*?>', html)
if css_match:
    css_src = css_match.group(1)
    css_path = os.path.join('dist', css_src.replace('./', ''))
    with open(css_path, 'r', encoding='utf-8') as f:
        css_content = f.read()
    html = html.replace(css_match.group(0), f'<style>\n{css_content}\n</style>')

with open('dist/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Successfully created fully inline index.html")
