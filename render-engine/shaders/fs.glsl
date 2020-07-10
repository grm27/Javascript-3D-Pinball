#version 300 es

precision mediump float;

in vec2 uvFS;
out vec4 outColor;
uniform sampler2D u_texture;
uniform vec4 mDiffColor;
in vec4 goureaudDiffuseAndAmbient;
in vec4 goureaudSpecular;
void main() {
  //float textureInfluence = 1.0;
  //vec4 diffuseTextureColorMixture = mDiffColor * (1.0 - textureInfluence) + texture(u_texture, uvFS) * textureInfluence ;
  //outColor = min(diffuseTextureColorMixture * (goureaudSpecular + goureaudDiffuseAndAmbient), vec4(1.0, 1.0, 1.0, 1.0));
  outColor = texture(u_texture, uvFS) + goureaudDiffuseAndAmbient + goureaudSpecular;
}