var readline = require('readline');

var fs=require('fs');

var stream =require('stream');//streams a file instead of reading it into memory

// var instream = fs.createReadStream('../CrimesData/CrimesData/crimes2001onwards.csv');

var newArray = [];

var above=[];

var under=[];

var i=0;j=0;
for(i=2001;i<=2016;i++)
{
  above[i]=0;
  under[i]=0;
}
const rl=readline.createInterface({
input:fs.createReadStream('crimes2001onwards.csv')
});

var outstream = fs.createWriteStream('Over500.json');

rl.on('line',function(line)
{

var finalLine=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

for(i=2001;i<=2016;i++)
{
  if(" "+finalLine[17]==" "+i && finalLine[5]=="THEFT")
  {
    if(finalLine[6]=="OVER $500")
    {
      above[i]++;
    }
    if(finalLine[6]=="$500 AND UNDER")
    {
      under[i]++;
    }
  }
}
});

rl.on('close',function()
{

for(var k=2001;k<=2016;k++)
{
  tempObj={};
  tempObj["year"]=k;
  tempObj["Over$500"]=above[k];
  tempObj["Under$500"]=under[k];

   newArray.push(tempObj);

}
console.log(newArray);

outstream.write(JSON.stringify(newArray),encoding="utf8");
});


// fs.readFile("crimes2001onwards.csv",function(err,data) {
//    if(err){
//      return console.error(err);
//    }
// console.log("Crimes Data file" + data.toString());
// });
//
// readline.eachLine('crimes2001onwards.csv',function(line,last)){
// console.log(line);
//
//
// }
