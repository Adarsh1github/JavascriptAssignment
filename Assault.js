var readline = require('readline');

var fs=require('fs');

var stream =require('stream');//streams a file instead of reading it into memory

// var instream = fs.createReadStream('../CrimesData/CrimesData/crimes2001onwards.csv');

var newArray2 = [];

var atTrue=[];

var ntTrue=[];

var i=0;k=0;
for(i=2001;i<=2016;i++)
{
  atTrue[i]=0;
  ntTrue[i]=0;
}
const rl=readline.createInterface({
input:fs.createReadStream('crimes2001onwards.csv')
});

var outstream = fs.createWriteStream('AssaultCases.json');

rl.on('line',function(line)
{

var finalLine=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

for(i=2001;i<=2016;i++)
{
  if(" "+finalLine[17]==" "+i && finalLine[8]=="TRUE" && finalLine[5]=="ASSAULT"){
      atTrue[i]++;
  }
  if(" "+finalLine[17]==" "+i && finalLine[8]=="FALSE" && finalLine[5]=="ASSAULT"){
      ntTrue[i]++;
    }
  }
});

rl.on('close',function()
{

for(var k=2001;k<=2016;k++)
{
  tempObj1={};
  tempObj1["year"]=k;
  tempObj1["caseTrue"]=atTrue[k];
  tempObj1["caseFalse"]=ntTrue[k];

   newArray2.push(tempObj1);

}
console.log(newArray2);

outstream.write(JSON.stringify(newArray2),encoding="utf8")
});
