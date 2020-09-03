//// interfaces

interface IBandPlayer {
  name: string;
  age: number;
  plays: string[];
}

interface IBandMembers {
  current: IBandPlayer[];
  past: IBandPlayer[];
  all?: string[];
}

interface IBand {
  members: IBandMembers;
  plays?: Object;
}

//// Function to transform data

function transformData(band: IBand): IBand {  
  const allBandPlayers = band.members.current.concat(band.members.past);

  const all = allBandPlayers
    .sort((a, b) => a.age === b.age ? a.name!.localeCompare(b.name!) : b.age - a.age)
    .map(p => p.name.toLowerCase());

  const uniquePlays = allBandPlayers.map(p => p.plays).reduce((acc, val) => acc.concat(val), []).filter((item, i, ar) => ar.indexOf(item) === i);
  const plays = uniquePlays.reduce((r: any, k, i) => {
    const playerNames = allBandPlayers.filter(a => a.plays.indexOf(k) > -1).map(g => g.name.toLowerCase());
    if (playerNames.length > 0) {
      r[k] ? r[k].push(...playerNames) : r[k] = playerNames;      
    }
    return r;
  }, {});

  return { members: {
    current: band.members.current,
    past: band.members.past,
    all
  }, plays };
}

// Testing the function with given data

const current: IBandPlayer[] = [
  { name: 'Sascha', age: 59, plays: ['vocals', 'synth', 'guitar', 'bass'] },
  { name: 'Lucia', age: 49, plays: ['vocals', 'synth'] },
  { name: 'Jules', age: 53, plays: ['guitar', 'bass', 'synth'] },
  { name: 'Steve', age: 55, plays: ['guitar'] }
];
const past: IBandPlayer[] = [
  { name: 'Raymond', age: 57, plays: ['vocals', 'synth'] },
  { name: 'En', age: 52, plays: ['vocals', 'drums', 'guitar', 'synth'] },
  { name: 'Gunter', age: 57, plays: ['guitar', 'synth'] }
];
const bandMembers: IBandMembers = { current, past };
const band: IBand = { members: bandMembers };
const transformedData: IBand = transformData(band);
console.log(transformedData);

