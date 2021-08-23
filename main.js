// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

function pAequorFactory(specimenNum, dna) {
  return {
    specimenNum,
    dna,
    complementStrand() {
      const complDna = this.dna;
      this.dna.forEach(e => {
        switch (e) {
          case 'A':
            complDna[i]='T';
            break;
          case 'T':
            complDna[i]='A';
            break;
          case 'C':
            complDna[i]='G';
            break;
          case 'G':
            complDna[i]='C';
            break;
        }
      });
    }
  }
};

let i = 1;
let dnaArray = [];
do {

  let dnaObj = new pAequorFactory(i, mockUpStrand());
  console.log(dnaObj.specimenNum);
  console.log(dnaObj.dna);
  console.log(dnaObj.complementStrand);

  dnaObj.mutate = function() {
    const randNum = Math.floor(Math.random() * 15);
    let newBase = returnRandBase();
    while (newBase === this.dna[randNum]) {
      newBase = returnRandBase()
    };
    this.dna[randNum] = newBase
  };

  dnaObj.compareDNA = function(pAequorIn) {
    let sum = 0;
    for(let i=0; i<this.dna.length; i++) {
      if (this.dna[i] === pAequorIn.dna[i]) {sum++};
    };
    const perc = Math.floor(sum/this.dna.length*100);
    console.log(`Specimen ${this.specimenNum} and specimen ${pAequorIn.specimenNum} have ${perc}% of their DNA in common` )
  };

  dnaObj.willLikelySurvive = function() {
    const cAndG = this.dna.filter(e => ((e === 'C') || (e === 'G')));
    return cAndG.length/this.dna.length >= 0.6
  };

  if (dnaObj.willLikelySurvive()) {
    dnaArray.push(dnaObj.dna);
    i++;
  }

} while (i<=30);

console.log(dnaArray)
