const fs = require('fs');

try {
  const data = fs.readFileSync('/Users/suvendusahoo/.gemini/antigravity/brain/8c795802-5790-44be-b759-e8959103619b/usg_abdomen_1777823018406.png');
  fs.writeFileSync('/Users/suvendusahoo/Desktop/lovable-project-d4931ee6 (2)/public/images/usg-abdomen.png', data);
  console.log("Success");
} catch (err) {
  console.error("Error:", err);
}
