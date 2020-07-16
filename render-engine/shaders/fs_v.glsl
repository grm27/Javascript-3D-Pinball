#version 300 es

precision mediump float;

in vec2 uvFS;
out vec4 outColor;
uniform sampler2D u_texture;
uniform vec4 mDiffColor;
in vec4 goureaudDiffuseAndAmbient;
in vec4 goureaudSpecular;

void main() {
   outColor = texture(u_texture, uvFS) + goureaudDiffuseAndAmbient + goureaudSpecular;
}