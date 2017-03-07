// ------------- What the hell?
/*
* People usually create retirement portfolio using one of these two logics:
*  1) Monthly deposits of % of income (saving for retirement), no calculation
* Or...
*  2) Perform a calculation that answers a constant monthly saving for retirement
* The approach 1) is very easy, but is very error prone. You can end saving too much
*  what is very bad, in a "live your life dude" perspective.
* The approach 2) is a little more complicated, but is doable. The tricky part is that
*  a constant deposit assumes you don't want to save more on the first years, When
*  you're more productive, or maybe save more on the middle years, on you probably
*  have a greater income.
* This formula is a first preview to try to create a non constant deposit amount pace.
* Future work will try to make it more flexible, so you can for example, save more
*  on the middle years, so you can spend more in the beggining and in the end.
*/

// ------------- Previous knoledge

/* Investment formula: sum[k=0 to T] D(k) * J^(T-k) = R */
// "D(k)" is the amount that will be deposited monthly
//   Any function will work. The function behavior is the most important,
//    for example, a decreasing function will produce deposit amounts that
//    decreases over the months
// "k" in the month index.
// "J" is the real interest of the investment
// "T" is the period of the investment
// "R" is the amount that will be produced in the end of the period

/* Deposit formula D(k) */
// D(k) = (D/T + (T - k) * (D/T) * A)
// It's something crazy that came on my mind
// I'm chosing a real estate financing formula, because it decreases over time
//  and I want this same behavior for deposits.
// "D" is the property price
// "T" is the total period of financing. It's the same T on the investment formula
// "A" is the real interest of the real estate financing.
//    This one can be chosen arbitrarily. The less "A" will produce lower decreasing
//      angle on deposit amounts

// ------------- Setup

/* Period of contribution in months */
// Months are indexed by "k", starting on 0 and stops on k=T
const T = 30 * 12 // 360

/* Deposit amount (de-)acelaration */
// When A -> 0, deposit tends to be a constant amount over time
// Greater A values means greater start deposits and lower final deposits
const A = 0.01

/* Retirement account real interest rate (expected) */
// The real interest rate is the rate of interest an investor, saver or lender
// receives (or expects to receive) after allowing for inflation. (Wikipedia)
const J = 1.00327

/* Retirement amount */
const R = 1 * 1000 * 1000 // 1 million

// ------------- Let's do this

var rp = require('request-promise');
var parseXMLString = require('xml2js').parseString;

/* Needs to find D investment equation */
// sum[k=0 to T] D(k) * J^(T-k) = R
// D(k) = (D/T + (T - k) * (D/T) * A)

const formula = `{ sum[k=0 to ${T}] (D/${T} + (${T} - k) * (D/${T}) * ${A}) * ${J}^(${T}-k) } = ${R}`

const options = {
  uri: 'http://api.wolframalpha.com/v2/query',
  qs: {
    appid: process.env.WOLFRAM_ALPHA_APPID,
    input: formula,
  },
}

rp(options).then((xml) => {
  return new Promise(function (resolve, reject) {
    parseXMLString(xml, (err, data) => {
      resolve(data)
    })
  })
}).then((json) => {
  const result = json.queryresult.pod[5].subpod[0].plaintext[0]
  console.log(result)
}).catch((err) => {
  console.error(err)
})
