#version 300 es

in vec3 a_position;
in vec2 a_uv;
in vec3 inNormal;
out vec2 uvFS;
out vec4 amb;
uniform vec4 ambientLightColor;
uniform float ambientLightInfluence;
uniform mat4 matrix;
void main() {
  uvFS = a_uv;
  amb = ambientLightColor * ambientLightInfluence;
  gl_Position = matrix * vec4(a_position,1.0);
}