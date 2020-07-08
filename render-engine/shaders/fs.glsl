#version 300 es

precision mediump float;

in vec2 uvFS;
out vec4 outColor;
uniform sampler2D u_texture;
in vec4 goureaudDiffuseAndAmbient;
void main() {
 //  vec4 diffuseTextureColorMixture = mDiffColor * (1.0 - textureInfluence) + texture2D(textureFile, fsUVs) * textureInfluence ;
 //gl_FragColor = min(diffuseTextureColorMixture * (goureaudSpecular + goureaudDiffuseAndAmbient), vec4(1.0, 1.0, 1.0, 1.0));
  outColor = texture(u_texture, uvFS) + goureaudDiffuseAndAmbient;
}