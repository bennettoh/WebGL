var vertexShaderText =
[
'precision mediump float;',
'',
'attribute vec2 vertPosition;',
'',
'void main()',
'{',
' gl_Position = vec4(vertPosition, 0.0, 1.0);',
'}'
].join('/n');

var fragmentShaderText =
[
  'precision mediump float;',
  '',
  'void main()',
  '{',
  ' gl_FragmentColor = vec4(1.0, 0.0, 0.0, 1.0);',
  '}'
].join('/n')

var InitDemo = function(){
  console.log('js loaded');

  var canvas = document.getElementById('game-surface');
  var gl = canvas.getContext('webgl');

  if (!gl){
    console.log('WebGL not supported');
  }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  gl.clearColor(0.8, 0.8, 0.8, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertexShader, vertexShaderText);
  gl.shaderSource(fragmentShader, fragmentShaderText);

  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);

  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  
  gl.validateProgram(program);

  //create buffer
  var triangleVertices =
  [ // X,Y
    0.0, 0.5,
    -0.5, -0.5,
    0.5, -0.5
  ];

  var triangleVertexBufferObject = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

  var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
  gl.vertexAttribPointer(
    positionAttribLocation, //Attribute location
    2, //number of elements per attribute
    gl.FLOAT, //type of elements
    gl.FLASE, //is data normalized?
    2 * Floast32Array.BYTES_PER_ELEMENT, //size of individual vertex
    0 //offset from the beginning of a single vertex to this attribute
  );

  gl.enableVertexAttribArray(positionAttribLocation);

  //main render loop

  gl.useProgram(program);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
};