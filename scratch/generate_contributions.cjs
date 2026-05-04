const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectDir = '/Users/suvendusahoo/Desktop/lovable-project-d4931ee6 (2)';
const contributionFile = path.join(projectDir, 'CONTRIBUTIONS.md');

// Ensure the contribution file exists
if (!fs.existsSync(contributionFile)) {
    fs.writeFileSync(contributionFile, '# Contribution Log\n');
}

// Start from 14 days ago
const now = new Date();
for (let i = 14; i > 0; i--) {
    const commitDate = new Date(now);
    commitDate.setDate(now.getDate() - i);
    
    // Create 2-4 commits per day for "density"
    const commitCount = Math.floor(Math.random() * 3) + 2;
    
    for (let j = 0; j < commitCount; j++) {
        // Adjust hour/minute for variety
        commitDate.setHours(9 + j, Math.floor(Math.random() * 60), 0);
        
        const timestamp = commitDate.toISOString();
        const logMessage = `Contribution update: ${timestamp} - iteration ${j}`;
        
        fs.appendFileSync(contributionFile, `- ${logMessage}\n`);
        
        // Stage the contribution file
        execSync('git add CONTRIBUTIONS.md', { cwd: projectDir });
        
        // Commit with backdated timestamp
        const env = {
            ...process.env,
            GIT_AUTHOR_DATE: timestamp,
            GIT_COMMITTER_DATE: timestamp
        };
        
        try {
            execSync(`git commit -m "docs: clinical platform optimization and maintenance update ${i}-${j}"`, { 
                cwd: projectDir,
                env: env
            });
            console.log(`Committed for ${timestamp}`);
        } catch (e) {
            console.error(`Failed commit for ${timestamp}: ${e.message}`);
        }
    }
}

console.log('Backdated commits completed.');
