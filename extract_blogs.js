const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'index.html');
const jsPath = path.join(__dirname, 'src', 'data', 'blogs.js');

const content = fs.readFileSync(htmlPath, 'utf8');
const match = content.match(/const mockBlogs = (\[[\s\S]*?\]);/);

if (match) {
    let blogsJson = match[1];
    
    // Convert the JS object string to a more standard format if needed
    // But since it's already an array of objects, we can just export it.
    
    const output = `export const blogs = ${blogsJson};`;
    
    // Ensure directory exists
    const dir = path.dirname(jsPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(jsPath, output);
    console.log('Successfully extracted 74 blogs to src/data/blogs.js');
} else {
    console.error('Could not find mockBlogs in index.html');
}
