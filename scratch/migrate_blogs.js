const fs = require('fs');
const path = require('path');

const indexPath = path.join(process.cwd(), 'index.html');
const outputPath = path.join(process.cwd(), 'src', 'data', 'blogs.js');

const content = fs.readFileSync(indexPath, 'utf8');

// Find the mockBlogs array
const match = content.match(/const mockBlogs = (\[[\s\S]*?\]);/);

if (match) {
    let blogsJson = match[1];
    
    // Convert the JS object string to a proper module export
    // We also need to add slugs if they don't exist
    // Let's eval it carefully in a safe way or just string manipulation
    // Since it's a known format from the user's file, we can process it.
    
    const blogs = eval(blogsJson);
    
    const processedBlogs = blogs.map(blog => {
        // Create slug from title if not present
        const slug = blog.title.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');
        return { ...blog, slug };
    });

    const fileContent = `export const blogs = ${JSON.stringify(processedBlogs, null, 2)};`;
    
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, fileContent);
    console.log(`Successfully migrated ${processedBlogs.length} articles to src/data/blogs.js`);
} else {
    console.error('Could not find mockBlogs array in index.html');
}
