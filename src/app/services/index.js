import axios from 'axios';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function fetchQuesList(page) {
  await sleep(1000);
  let data = [{
    remoteOJ:'HDU',
    remoteProblemId: '1000',
    title: 'A + B Problem',
    ratio: '30.87%(220395/713855)',
  }, {
    remoteOJ:'HDU',
    remoteProblemId: '1001',
    title: 'Sum Problem',
    ratio: '25.36%(129232/509626)',
  }, {
    remoteOJ:'HDU',
    remoteProblemId: '1002',
    title: 'A + B Problem II',
    ratio: '19.36%(74637/385502)',
  }, {
    remoteProblemId: '1003',
    title: 'Max Sum',
    ratio: '23.77%(62287/262089)',
  }, {
    remoteProblemId: '1004',
    title: 'Let the Balloon Rise',
    ratio: '39.50%(51308/129882)',
  }, {
    remoteProblemId: '1005',
    title: 'Number Sequence',
    ratio: '24.88%(45648/183443)',
  }, {
    remoteProblemId: '1006',
    title: 'A + B Problem',
    ratio: '30.87%(220395/713855)',
  }, {
    remoteProblemId: '1007',
    title: 'Sum Problem',
    ratio: '25.36%(129232/509626)',
  }, {
    remoteProblemId: '1008',
    title: 'A + B Problem II',
    ratio: '19.36%(74637/385502)',
  }, {
    remoteProblemId: '1009',
    title: 'Max Sum',
    ratio: '23.77%(62287/262089)',
  }, {
    remoteProblemId: '1010',
    title: 'Let the Balloon Rise',
    ratio: '39.50%(51308/129882)',
  }, {
    remoteProblemId: '1011',
    title: 'Number Sequence',
    ratio: '24.88%(45648/183443)',
  }];

  data = data.slice(10 * (page - 1), 10 * page);
  return {
    totalCount: 11,
    results: data,
  };
}

export async function fetchQuesDet(id){
  await sleep(1000);
  let data = {
    title: 'A + B Problem',
    timeLimit: '2000/1000 MS (Java/Others)',
    memoryLimit: '65536/32768 K (Java/Others)',
    description: 'We define the distance of two strings A and B with same length n is<br><span class="MathJax_Preview"></span><span class="MathJax" id="MathJax-Element-1-Frame" role="textbox" aria-readonly="true" style=""><nobr><span class="math" id="MathJax-Span-1" style="width: 11.307em; display: inline-block;"><span style="display: inline-block; position: relative; width: 10.96em; height: 0px; font-size: 103%;"><span style="position: absolute; clip: rect(0.697em 1000em 3.748em -0.621em); top: -2.493em; left: 0.003em;"><span class="mrow" id="MathJax-Span-2"><span class="mi" id="MathJax-Span-3" style="font-family: STIXGeneral-Italic;">d<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.003em;"></span></span><span class="mi" id="MathJax-Span-4" style="font-family: STIXGeneral-Italic;">i</span><span class="msubsup" id="MathJax-Span-5"><span style="display: inline-block; position: relative; width: 1.737em; height: 0px;"><span style="position: absolute; clip: rect(1.876em 1000em 2.708em -0.621em); top: -2.493em; left: 0.003em;"><span class="mi" id="MathJax-Span-6" style="font-family: STIXGeneral-Italic;">s</span><span style="display: inline-block; width: 0px; height: 2.5em;"></span></span><span style="position: absolute; top: -2.077em; left: 0.42em;"><span class="texatom" id="MathJax-Span-7"><span class="mrow" id="MathJax-Span-8"><span class="mi" id="MathJax-Span-9" style="font-size: 70.7%; font-family: STIXGeneral-Italic;">A</span><span class="mo" id="MathJax-Span-10" style="font-size: 70.7%; font-family: STIXGeneral-Regular;">,</span><span class="mi" id="MathJax-Span-11" style="font-size: 70.7%; font-family: STIXGeneral-Italic;">B</span></span></span><span style="display: inline-block; width: 0px; height: 2.223em;"></span></span></span></span><span class="mo" id="MathJax-Span-12" style="font-family: STIXGeneral-Regular; padding-left: 0.35em;">=</span><span class="munderover" id="MathJax-Span-13" style="padding-left: 0.35em;"><span style="display: inline-block; position: relative; width: 1.39em; height: 0px;"><span style="position: absolute; clip: rect(1.529em 1000em 2.985em -0.551em); top: -2.493em; left: 0.281em;"><span class="mo" id="MathJax-Span-14" style="font-family: STIXGeneral-Regular; vertical-align: 0.003em;">∑</span><span style="display: inline-block; width: 0px; height: 2.5em;"></span></span><span style="position: absolute; clip: rect(1.529em 1000em 2.569em -0.621em); top: -1.314em; left: 0.073em;"><span class="texatom" id="MathJax-Span-15"><span class="mrow" id="MathJax-Span-16"><span class="mi" id="MathJax-Span-17" style="font-size: 70.7%; font-family: STIXGeneral-Italic;">i</span><span class="mo" id="MathJax-Span-18" style="font-size: 70.7%; font-family: STIXGeneral-Regular;">=</span><span class="mn" id="MathJax-Span-19" style="font-size: 70.7%; font-family: STIXGeneral-Regular;">0</span></span></span><span style="display: inline-block; width: 0px; height: 2.223em;"></span></span><span style="position: absolute; clip: rect(1.46em 1000em 2.431em -0.621em); top: -3.187em; left: 0.003em;"><span class="texatom" id="MathJax-Span-20"><span class="mrow" id="MathJax-Span-21"><span class="mi" id="MathJax-Span-22" style="font-size: 70.7%; font-family: STIXGeneral-Italic;">n</span><span class="mo" id="MathJax-Span-23" style="font-size: 70.7%; font-family: STIXGeneral-Regular;">−</span><span class="mn" id="MathJax-Span-24" style="font-size: 70.7%; font-family: STIXGeneral-Regular;">1</span></span></span><span style="display: inline-block; width: 0px; height: 2.223em;"></span></span></span></span><span class="texatom" id="MathJax-Span-25" style="padding-left: 0.212em;"><span class="mrow" id="MathJax-Span-26"><span class="mo" id="MathJax-Span-27" style="font-family: STIXGeneral-Regular;">|</span></span></span><span class="msubsup" id="MathJax-Span-28"><span style="display: inline-block; position: relative; width: 0.905em; height: 0px;"><span style="position: absolute; clip: rect(1.598em 1000em 2.708em -0.69em); top: -2.493em; left: 0.003em;"><span class="mi" id="MathJax-Span-29" style="font-family: STIXGeneral-Italic;">A</span><span style="display: inline-block; width: 0px; height: 2.5em;"></span></span><span style="position: absolute; top: -2.077em; left: 0.628em;"><span class="texatom" id="MathJax-Span-30"><span class="mrow" id="MathJax-Span-31"><span class="mi" id="MathJax-Span-32" style="font-size: 70.7%; font-family: STIXGeneral-Italic;">i</span></span></span><span style="display: inline-block; width: 0px; height: 2.223em;"></span></span></span></span><span class="mo" id="MathJax-Span-33" style="font-family: STIXGeneral-Regular; padding-left: 0.281em;">−</span><span class="msubsup" id="MathJax-Span-34" style="padding-left: 0.281em;"><span style="display: inline-block; position: relative; width: 2.916em; height: 0px;"><span style="position: absolute; clip: rect(1.668em 1000em 2.708em -0.621em); top: -2.493em; left: 0.003em;"><span class="mi" id="MathJax-Span-35" style="font-family: STIXGeneral-Italic;">B</span><span style="display: inline-block; width: 0px; height: 2.5em;"></span></span><span style="position: absolute; top: -2.077em; left: 0.628em;"><span class="texatom" id="MathJax-Span-36"><span class="mrow" id="MathJax-Span-37"><span class="mi" id="MathJax-Span-38" style="font-size: 70.7%; font-family: STIXGeneral-Italic;">n</span><span class="mo" id="MathJax-Span-39" style="font-size: 70.7%; font-family: STIXGeneral-Regular;">−</span><span class="mn" id="MathJax-Span-40" style="font-size: 70.7%; font-family: STIXGeneral-Regular;">1</span><span class="mo" id="MathJax-Span-41" style="font-size: 70.7%; font-family: STIXGeneral-Regular;">−</span><span class="mi" id="MathJax-Span-42" style="font-size: 70.7%; font-family: STIXGeneral-Italic;">i</span></span></span><span style="display: inline-block; width: 0px; height: 2.223em;"></span></span></span></span><span class="texatom" id="MathJax-Span-43"><span class="mrow" id="MathJax-Span-44"><span class="mo" id="MathJax-Span-45" style="font-family: STIXGeneral-Regular;">|</span></span></span></span><span style="display: inline-block; width: 0px; height: 2.5em;"></span></span></span><span style="border-left: 0.004em solid; display: inline-block; overflow: hidden; width: 0px; height: 2.861em; vertical-align: -1.139em;"></span></span></nobr></span><script type="math/tex" id="MathJax-Element-1">dis_{A,B} = \sum\limits_{i=0}^{n-1}|A_{i}-B_{n-1-i}|</script><br>The difference between the two characters is defined as the difference in ASCII.<br>You should find the maximum length of two non-overlapping substrings in given string S, and the distance between them are less then or equal to m.<br>',
    input: 'Each line will contain two integers A and B. Process to end of file.',
    output: 'For each case, output A + B in one line.',
    sampleInput: '1 1',
    sampleOutput: '2',
    author: 'HDOJ',
    source: 'ZJCPC2004',
    recommend: ''
  };
  return data;

}