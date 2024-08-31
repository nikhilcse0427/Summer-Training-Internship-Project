const downloadCharacterSheet = () => {
  const node = document.getElementById('id-card');

  html2canvas(node).then(canvas => {
    const link = document.createElement('a');
    link.download = 'id-card.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }).catch(error => {
    console.error('Error generating canvas:', error);
  });
};

const bindInputToElement = (inputEl, elementEl) => {
  inputEl.addEventListener('input', () => {
    elementEl.textContent = inputEl.value;
  });
};

const generateSubjectId = (name) => {
  // Simple hash function example
  let hash = 0, i, chr;
  for (i = 0; i < name.length; i++) {
    chr = name.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16).slice(0, 8).toUpperCase();
};

const updateSubjectId = () => {
  const nameEl = document.getElementById('name');
  const subjectIdEl = document.querySelector('.id-card__subject-id');
  subjectIdEl.textContent = generateSubjectId(nameEl.value);
};

document.getElementById('download-button').addEventListener('click', downloadCharacterSheet);

// Bind name
const nameEl = document.getElementById('name');
bindInputToElement(nameEl, document.getElementById('id-card-name'));
nameEl.addEventListener('input', updateSubjectId);

// Bind date of birth
bindInputToElement(document.getElementById('date-of-birth'), document.getElementById('id-card-date-of-birth'));

// Bind gender
document.getElementById('gender').addEventListener('change', () => {
  document.getElementById('id-card-gender').textContent = document.getElementById('gender').value;
});

// Bind height
bindInputToElement(document.getElementById('height'), document.getElementById('id-card-height'));

// Bind weight
bindInputToElement(document.getElementById('weight'), document.getElementById('id-card-weight'));

// Bind mugshot
document.getElementById('mugshot').addEventListener('change', function() {
  if (this.files && this.files[0]) {
    const file = this.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
      const img = document.getElementById('id-card-mugshot');
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

