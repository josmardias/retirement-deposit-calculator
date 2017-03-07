// formula
// sum[k=0 to T] D(k) * J^(T-k) = R
// D(k): monthly deposit
// J: deposit real interest
// T: total investment period
// R: Retirement amount (real value)

// Obs.: assuming R=1000000, T=360 months, J=1.00327

// Constant Deposits
//using D(k) = D
{ sum[k=0 to 359] D * 1.00327^(360-k) } = 1000000
686.963 D = 1000000
D = 1455.68

// Regressive Deposits (using real estate financing formula for deposit behavior)
// using D(k) = (D/360 + (360 - k) * (D/360) * A), for A = 0.01 (it's a real estate financing formula)
{ sum[k=0 to 359] (D/360 + (360 - k) * (D/360) * 0.01) * 1.00327^(360-k) } = 1000000
6.0104 D = 1000000
D = 166378

=> D(k) = (27541.3/360 + (360 - k) * (27541.3/360) * 0.01) where k = 0, 1, 179, 180, 358, 359

D(0) = 2125.94
D(1) = 2121.32
...
D(179) = 1298.67
D(180) = 1294.05
...
D(358) = 471.404
D(359) = 466.783

// Regressive deposits (using random formula for deposit behavior)
// usig D(k) = 2000 - d*k
{ sum[k=0 to 359] (2000 - d*k) * 1.00327^(360-k) } = 1000000
d = 3.7532

=> D(k) = 2000 - 3.7532*k where k = 0, 1, 179, 180, 358, 359

D(0) = 2000
D(1) = 1996.25
...
D(179) = 1328.18
D(180) = 1324.42
...
D(358) = 656.354
D(359) = 652.601

// High/Low/High/Low...
// using D(k) = (3 + cos(pi * (1 + k)))/2 * D
{ sum[k=0 to 359] (3 + cos(pi * (1 + k)))/2 * D * 1.00327^(360-k) } = 1000000
1029.88 D = 1000000
D = 970.983

=> D(k) = (3 + cos(pi * (1 + k)))/2 * 189.176 where k = 0, 1, 2, 3, 358, 359

D(0) = 970.983
D(1) = 1941.97
D(2) = 970.983
D(3) = 1941.97
...
D(358) = 970.983
D(359) = 1941.97
