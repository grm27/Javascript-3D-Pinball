#version 300 es

in vec3 a_position;
in vec2 a_uv;
in vec3 inNormal;

out vec3 fsNormal;
out vec3 fsPosition;
out vec2 fsUVs;

uniform mat4 world_matrix;
uniform mat4 matrix;
uniform mat4 nMatrix;

void main() {
    fsNormal = mat3(nMatrix)*inNormal;
    fsUVs = a_uv;
    gl_Position = matrix * vec4(a_position,1.0);
    fsPosition = (world_matrix * vec4(a_position,1.0)).xyz;
}