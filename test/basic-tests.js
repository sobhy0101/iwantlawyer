// Basic tests for I Want Lawyer website functionality

const fs = require('fs');
const path = require('path');

// Test results tracking
let passedTests = 0;
let totalTests = 0;

function test(description, testFn) {
    totalTests++;
    try {
        testFn();
        console.log(`✅ PASS: ${description}`);
        passedTests++;
    } catch (error) {
        console.log(`❌ FAIL: ${description}`);
        console.log(`   Error: ${error.message}`);
    }
}

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function assertEquals(actual, expected, message) {
    if (actual !== expected) {
        throw new Error(message || `Expected ${expected}, but got ${actual}`);
    }
}

// Test file existence and structure
console.log('🧪 Running basic tests for I Want Lawyer website...\n');

// Test 1: Check if main files exist
test('Main HTML file exists', () => {
    const indexPath = path.join(__dirname, '..', 'index.html');
    assert(fs.existsSync(indexPath), 'index.html should exist');
});

test('Main CSS file exists', () => {
    const cssPath = path.join(__dirname, '..', 'assets', 'css', 'styles.css');
    assert(fs.existsSync(cssPath), 'styles.css should exist');
});

test('Main JavaScript file exists', () => {
    const jsPath = path.join(__dirname, '..', 'assets', 'js', 'main.js');
    assert(fs.existsSync(jsPath), 'main.js should exist');
});

test('Package.json file exists', () => {
    const packagePath = path.join(__dirname, '..', 'package.json');
    assert(fs.existsSync(packagePath), 'package.json should exist');
});

// Test 2: Check HTML structure
test('HTML contains all required pages', () => {
    const indexPath = path.join(__dirname, '..', 'index.html');
    const htmlContent = fs.readFileSync(indexPath, 'utf8');
    
    const requiredPages = [
        'id="home"',
        'id="practice-areas"',
        'id="attorneys"',
        'id="alliance-offices"',
        'id="counselors"',
        'id="immigration"',
        'id="legal-advice"',
        'id="contact"'
    ];
    
    requiredPages.forEach(page => {
        assert(htmlContent.includes(page), `HTML should contain ${page}`);
    });
});

test('HTML contains navigation menu', () => {
    const indexPath = path.join(__dirname, '..', 'index.html');
    const htmlContent = fs.readFileSync(indexPath, 'utf8');
    
    assert(htmlContent.includes('class="navbar"'), 'HTML should contain navbar');
    assert(htmlContent.includes('class="nav-menu"'), 'HTML should contain nav-menu');
    assert(htmlContent.includes('class="hamburger"'), 'HTML should contain hamburger menu');
});

test('HTML contains contact form', () => {
    const indexPath = path.join(__dirname, '..', 'index.html');
    const htmlContent = fs.readFileSync(indexPath, 'utf8');
    
    assert(htmlContent.includes('id="contact-form"'), 'HTML should contain contact form');
    assert(htmlContent.includes('input type="email"'), 'HTML should contain email input');
    assert(htmlContent.includes('textarea'), 'HTML should contain textarea');
});

// Test 3: Check CSS structure
test('CSS contains responsive design rules', () => {
    const cssPath = path.join(__dirname, '..', 'assets', 'css', 'styles.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    
    assert(cssContent.includes('@media'), 'CSS should contain media queries');
    assert(cssContent.includes('grid-template-columns'), 'CSS should use CSS Grid');
    assert(cssContent.includes('flex'), 'CSS should use Flexbox');
});

test('CSS contains navigation styles', () => {
    const cssPath = path.join(__dirname, '..', 'assets', 'css', 'styles.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    
    assert(cssContent.includes('.navbar'), 'CSS should contain navbar styles');
    assert(cssContent.includes('.nav-menu'), 'CSS should contain nav-menu styles');
    assert(cssContent.includes('.hamburger'), 'CSS should contain hamburger styles');
});

// Test 4: Check JavaScript functionality (basic structure)
test('JavaScript contains main functions', () => {
    const jsPath = path.join(__dirname, '..', 'assets', 'js', 'main.js');
    const jsContent = fs.readFileSync(jsPath, 'utf8');
    
    const requiredFunctions = [
        'function showPage',
        'function setupNavigation',
        'function setupContactForm',
        'function handleContactSubmission'
    ];
    
    requiredFunctions.forEach(fn => {
        assert(jsContent.includes(fn), `JavaScript should contain ${fn}`);
    });
});

// Test 5: Validate package.json structure
test('Package.json has correct structure', () => {
    const packagePath = path.join(__dirname, '..', 'package.json');
    const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    assert(packageContent.name === 'iwantlawyer', 'Package name should be iwantlawyer');
    assert(packageContent.version, 'Package should have version');
    assert(packageContent.description, 'Package should have description');
    assert(packageContent.scripts, 'Package should have scripts');
});

// Test 6: Check if all practice areas are included
test('All practice areas are included in HTML', () => {
    const indexPath = path.join(__dirname, '..', 'index.html');
    const htmlContent = fs.readFileSync(indexPath, 'utf8');
    
    const practiceAreas = [
        'Corporate Law',
        'Immigration Law',
        'Real Estate Law',
        'Family Law',
        'Civil Litigation',
        'Criminal Defense'
    ];
    
    practiceAreas.forEach(area => {
        assert(htmlContent.includes(area), `HTML should contain ${area}`);
    });
});

// Test 7: Check attorney profiles are included
test('Attorney profiles are included', () => {
    const indexPath = path.join(__dirname, '..', 'index.html');
    const htmlContent = fs.readFileSync(indexPath, 'utf8');
    
    const attorneys = [
        'John Mitchell',
        'Sarah Rodriguez',
        'David Chen',
        'Emily Thompson'
    ];
    
    attorneys.forEach(attorney => {
        assert(htmlContent.includes(attorney), `HTML should contain attorney ${attorney}`);
    });
});

// Test 8: Check office locations are included
test('Alliance offices are included', () => {
    const indexPath = path.join(__dirname, '..', 'index.html');
    const htmlContent = fs.readFileSync(indexPath, 'utf8');
    
    const offices = [
        'New York, USA',
        'London, UK',
        'Tokyo, Japan',
        'Dubai, UAE'
    ];
    
    offices.forEach(office => {
        assert(htmlContent.includes(office), `HTML should contain office ${office}`);
    });
});

// Test 9: Accessibility features
test('HTML includes accessibility features', () => {
    const indexPath = path.join(__dirname, '..', 'index.html');
    const htmlContent = fs.readFileSync(indexPath, 'utf8');
    
    assert(htmlContent.includes('alt='), 'HTML should contain alt attributes');
    assert(htmlContent.includes('lang="en"'), 'HTML should have language attribute');
    assert(htmlContent.includes('meta name="description"'), 'HTML should have meta description');
});

// Test 10: Form validation
test('Contact form has proper validation attributes', () => {
    const indexPath = path.join(__dirname, '..', 'index.html');
    const htmlContent = fs.readFileSync(indexPath, 'utf8');
    
    assert(htmlContent.includes('required'), 'Form should have required fields');
    assert(htmlContent.includes('type="email"'), 'Form should have email type input');
    assert(htmlContent.includes('type="tel"'), 'Form should have tel type input');
});

// Test Results Summary
console.log('\n📊 Test Results Summary:');
console.log(`Total Tests: ${totalTests}`);
console.log(`Passed: ${passedTests}`);
console.log(`Failed: ${totalTests - passedTests}`);

if (passedTests === totalTests) {
    console.log('🎉 All tests passed! Website structure is correct.');
    process.exit(0);
} else {
    console.log('⚠️  Some tests failed. Please review the issues above.');
    process.exit(1);
}