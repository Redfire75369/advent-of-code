const input = `79
142
139
33
56
133
138
61
125
88
158
123
65
69
105
6
81
31
60
70
159
114
71
15
13
72
118
14
9
93
162
140
165
1
80
148
32
53
102
5
68
101
111
85
45
25
16
59
131
23
91
92
115
103
166
22
145
161
108
155
135
55
86
34
37
78
28
75
7
104
121
24
153
167
95
87
94
134
154
84
151
124
62
49
38
39
54
109
128
19
2
98
122
132
141
168
8
160
50
42
46
110
12
152`;

const inputs = input.split("\n").map(x => Number(x)).sort((a, b) => a - b);
inputs.push(Math.max(...inputs) + 3);
inputs.unshift(0);

/* Part 1 */
function part1() {
	function adapt(jolts) {
		for (let i = 0; i < inputs.length; i++) {
			if (inputs[i] <= jolts + 3) {
				jolts = inputs[i];
				adapters.push(inputs[i]);
				if (inputs[i] === jolts + 1) {
					oneV.push(inputs[i]);
				} else if (inputs[i] === jolts + 3) {
					threeV.push(inputs[i]);
				}
			}
		}
	}
	
	let jolts = 0;
	const adapters = [];
	let oneV = 0;
	let threeV = 0;
	
	for (let i = 0; i < inputs.length; i++) {
		if (inputs[i] <= jolts + 3) {
			if (inputs[i] === jolts + 1) {
				oneV++;
			} else if (inputs[i] === jolts + 3) {
				threeV++;
			}
			adapters.push(inputs[i]);
			jolts = inputs[i];
		}
	}

	if (adapters.length === inputs.length) {
		return oneV * threeV;
	}
}

console.log("Part 1: " + part1());

/* Part 2 */
function part2() {
	const routes = {};
	routes[inputs[inputs.length - 1]] = 1;
	
	for (let i = inputs.length - 2; i >= 0; i--) {
		routes[inputs[i]] = 0;

		for (let j = i + 1; j < inputs.length && j <= i + 3; j++) {
			if (inputs[j] <= inputs[i] + 3) {
				routes[inputs[i]] += routes[inputs[j]];
			}
		}
	}
	
	return routes[0];
}
console.log("Part 2: " + part2());
