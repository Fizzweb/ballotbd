// Bengali number conversion
const bengaliNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

function toBengaliNumber(num) {
    return String(num).split('').map(digit => bengaliNumbers[digit] || digit).join('');
}

// Global variables
let candidatesData = [];

// Update candidates based on selection
function updateCandidates() {
    const count = parseInt(document.getElementById('candidateCount').value);
    const candidatesSection = document.getElementById('candidatesSection');
    const ballotSection = document.getElementById('ballotSection');
    const candidateInputs = document.getElementById('candidateInputs');
    const totalCandidates = document.getElementById('totalCandidates');
    
    if (count === 0) {
        candidatesSection.classList.add('hidden');
        ballotSection.classList.add('hidden');
        return;
    }
    
    candidatesSection.classList.remove('hidden');
    ballotSection.classList.remove('hidden');
    totalCandidates.textContent = toBengaliNumber(count);
    
    candidateInputs.innerHTML = '';
    candidatesData = [];
    
    for (let i = 1; i <= count; i++) {
        const div = document.createElement('div');
        div.className = 'candidate-item';
        div.innerHTML = `
            <h3>প্রার্থী ${toBengaliNumber(i)}</h3>
            <div class="input-group">
                <label>প্রার্থী ${toBengaliNumber(i)} এর নাম/মার্কা:</label>
                <input type="text" class="candidate-name" placeholder="নাম বা মার্কা লিখুন">
            </div>
            <div class="input-group">
                <label>প্রার্থী ${toBengaliNumber(i)} এর প্রাপ্ত বৈধ ভোট সংখ্যা:</label>
                <input type="number" class="candidate-vote" min="0" value="0">
            </div>
            <div class="input-group">
                <label>প্রার্থী ${toBengaliNumber(i)} এর প্রাপ্ত আপত্তিকৃত ভোট সংখ্যা:</label>
                <input type="number" class="candidate-objection" min="0" value="0">
            </div>
        `;
        candidateInputs.appendChild(div);
    }
    
    // Add event listeners to newly created inputs
    document.querySelectorAll('.candidate-vote').forEach(input => {
        input.addEventListener('input', calculateValidVotes);
    });
    
    document.querySelectorAll('.candidate-objection').forEach(input => {
        input.addEventListener('input', calculateObjectionVotes);
    });
    
    calculateValidVotes();
    calculateObjectionVotes();
}

// Calculate total valid votes
function calculateValidVotes() {
    const candidateVotes = document.querySelectorAll('.candidate-vote');
    let total = 0;
    
    candidateVotes.forEach(input => {
        total += parseInt(input.value) || 0;
    });
    
    document.getElementById('validDisplay').value = total;
    calculateTotals();
}

// Calculate total objection votes
function calculateObjectionVotes() {
    const candidateObjections = document.querySelectorAll('.candidate-objection');
    let total = 0;
    
    candidateObjections.forEach(input => {
        total += parseInt(input.value) || 0;
    });
    
    document.getElementById('objectionDisplay').value = total;
    calculateTotals();
}

// Calculate all totals
function calculateTotals() {
    const validVotes = parseInt(document.getElementById('validDisplay').value) || 0;
    const invalid = parseInt(document.getElementById('invalid').value) || 0;
    const spoiled = parseInt(document.getElementById('spoiled').value) || 0;
    const objection = parseInt(document.getElementById('objectionDisplay').value) || 0;
    const casting = parseInt(document.getElementById('casting').value) || 0;
    const unused = parseInt(document.getElementById('unused').value) || 0;
    const allocated = parseInt(document.getElementById('allocated').value) || 0;
    
    const usedBallots = validVotes + invalid + spoiled + objection + casting;
    const totalBallots = usedBallots + unused;
    const finalLost = allocated - totalBallots;
    
    document.getElementById('usedBallots').textContent = toBengaliNumber(usedBallots);
    document.getElementById('totalBallots').textContent = toBengaliNumber(totalBallots);
    document.getElementById('finalLost').textContent = toBengaliNumber(finalLost);
}

// View summary page
function viewSummary() {
    const validVotes = parseInt(document.getElementById('validDisplay').value) || 0;
    const invalid = parseInt(document.getElementById('invalid').value) || 0;
    const spoiled = parseInt(document.getElementById('spoiled').value) || 0;
    const objection = parseInt(document.getElementById('objectionDisplay').value) || 0;
    const casting = parseInt(document.getElementById('casting').value) || 0;
    const unused = parseInt(document.getElementById('unused').value) || 0;
    const allocated = parseInt(document.getElementById('allocated').value) || 0;
    
    const totalBallots = validVotes + invalid + spoiled + objection + casting + unused;
    const finalLost = allocated - totalBallots;
    const grandTotal = validVotes + invalid + spoiled + objection + casting + unused + finalLost;
    
    document.getElementById('sumValid').textContent = toBengaliNumber(validVotes);
    document.getElementById('sumInvalid').textContent = toBengaliNumber(invalid);
    document.getElementById('sumSpoiled').textContent = toBengaliNumber(spoiled);
    document.getElementById('sumObjection').textContent = toBengaliNumber(objection);
    document.getElementById('sumCasting').textContent = toBengaliNumber(casting);
    document.getElementById('sumUnused').textContent = toBengaliNumber(unused);
    document.getElementById('sumLost').textContent = toBengaliNumber(finalLost);
    document.getElementById('sumTotal').textContent = toBengaliNumber(grandTotal);
    
    document.getElementById('inputPage').classList.add('hidden');
    document.getElementById('summaryPage').classList.remove('hidden');
    document.getElementById('formsSection').classList.add('hidden');
}

// Go back to input page
function goBack() {
    document.getElementById('summaryPage').classList.add('hidden');
    document.getElementById('inputPage').classList.remove('hidden');
}

// Show forms
function showForms() {
    // Collect candidate data
    const candidateNames = document.querySelectorAll('.candidate-name');
    const candidateVotes = document.querySelectorAll('.candidate-vote');
    const candidateObjections = document.querySelectorAll('.candidate-objection');
    
    candidatesData = [];
    candidateNames.forEach((nameInput, index) => {
        candidatesData.push({
            name: nameInput.value || `প্রার্থী ${toBengaliNumber(index + 1)}`,
            validVotes: parseInt(candidateVotes[index].value) || 0,
            objectionVotes: parseInt(candidateObjections[index].value) || 0
        });
    });
    
    const validVotes = parseInt(document.getElementById('validDisplay').value) || 0;
    const invalid = parseInt(document.getElementById('invalid').value) || 0;
    const spoiled = parseInt(document.getElementById('spoiled').value) || 0;
    const objection = parseInt(document.getElementById('objectionDisplay').value) || 0;
    const casting = parseInt(document.getElementById('casting').value) || 0;
    const unused = parseInt(document.getElementById('unused').value) || 0;
    const allocated = parseInt(document.getElementById('allocated').value) || 0;
    const finalLost = allocated - (validVotes + invalid + spoiled + objection + casting + unused);
    
    // Form 16 Data
    document.getElementById('form16AreaName').textContent = '-';
    document.getElementById('form16TotalVoters').textContent = toBengaliNumber(allocated);
    document.getElementById('form16CenterName').textContent = '-';
    
    // Candidate Results
    const candidateResults = document.getElementById('candidateResults');
    candidateResults.innerHTML = '';
    
    candidatesData.forEach((candidate, index) => {
        const totalValid = candidate.validVotes + candidate.objectionVotes;
        const resultDiv = document.createElement('div');
        resultDiv.className = 'candidate-result';
        resultDiv.innerHTML = `
            <h4>প্রার্থী ${toBengaliNumber(index + 1)}: ${candidate.name}</h4>
            <div class="form-row">
                <span>বৈধ ভোট:</span>
                <span class="value">${toBengaliNumber(candidate.validVotes)}</span>
            </div>
            <div class="form-row">
                <span>আপত্তিকৃত ভোট:</span>
                <span class="value">${toBengaliNumber(candidate.objectionVotes)}</span>
            </div>
            <div class="form-row" style="background: #e8f5e9;">
                <span><strong>মোট বৈধ ভোট:</strong></span>
                <span class="value"><strong>${toBengaliNumber(totalValid)}</strong></span>
            </div>
        `;
        candidateResults.appendChild(resultDiv);
    });
    
    // Calculate sum of all candidates' total valid votes (validVotes + objectionVotes)
    let totalCandidateValidVotes = 0;
    candidatesData.forEach(candidate => {
        totalCandidateValidVotes += candidate.validVotes + candidate.objectionVotes;
    });
    
    document.getElementById('form16TotalValid').textContent = toBengaliNumber(totalCandidateValidVotes);
    document.getElementById('form16TotalInvalid').textContent = toBengaliNumber(invalid);
    document.getElementById('form16GrandTotal').textContent = toBengaliNumber(totalCandidateValidVotes + invalid);
    
    // Form 17 Data
    document.getElementById('form17AreaName').textContent = '-';
    document.getElementById('form17TotalVoters').textContent = toBengaliNumber(allocated);
    document.getElementById('form17CenterName').textContent = '-';
    document.getElementById('form17Allocated').textContent = toBengaliNumber(allocated);
    document.getElementById('form17Counted').textContent = toBengaliNumber(validVotes + invalid);
    document.getElementById('form17Tender').textContent = toBengaliNumber(casting);
    document.getElementById('form17Objection').textContent = toBengaliNumber(objection);
    document.getElementById('form17Lost').textContent = toBengaliNumber(finalLost);
    document.getElementById('form17Spoiled').textContent = toBengaliNumber(spoiled);
    
    const usedTotal = (validVotes + invalid) + casting + objection + finalLost + spoiled;
    document.getElementById('form17UsedTotal').textContent = toBengaliNumber(usedTotal);
    document.getElementById('form17Unused').textContent = toBengaliNumber(unused);
    document.getElementById('form17GrandTotal').textContent = toBengaliNumber(allocated);
    
    // Show forms section
    document.getElementById('formsSection').classList.remove('hidden');
    
    // Scroll to forms
    setTimeout(() => {
        document.getElementById('formsSection').scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Candidate count selector
    document.getElementById('candidateCount').addEventListener('change', updateCandidates);
    
    // Summary button
    document.getElementById('summaryBtn').addEventListener('click', viewSummary);
    
    // Forms button
    document.getElementById('formsBtn').addEventListener('click', showForms);
    
    // Ballot inputs
    document.getElementById('invalid').addEventListener('input', calculateTotals);
    document.getElementById('spoiled').addEventListener('input', calculateTotals);
    document.getElementById('casting').addEventListener('input', calculateTotals);
    document.getElementById('unused').addEventListener('input', calculateTotals);
    document.getElementById('allocated').addEventListener('input', calculateTotals);
});
