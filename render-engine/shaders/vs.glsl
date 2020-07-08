#version 300 es

in vec3 a_position;
in vec2 a_uv;
in vec3 inNormal;
out vec2 uvFS;
out vec4 goureaudDiffuseAndAmbient;
uniform vec4 ambientLightColor;
uniform float ambientLightInfluence;
uniform vec3 lightDirection;
uniform vec3 lightPosition;
uniform vec4 lightColor;
uniform int lightType;

uniform mat4 matrix;

vec4 lightModel(int lt, vec3 pos) {

  // The normalize light direction
  vec3 nLightDir;

  // Float to store light dimension and cone length
  float lDim, lCone;

  lDim = 1.0;

  if (lt == 1) {  		// Directional light
    nLightDir = - normalize(lightDirection);
  } else if (lt == 2) {	// Point light
    nLightDir = normalize(lightPosition - pos);
  } else if (lt == 3) {	// Point light (decay)
    float lLen = length(lightPosition - pos);
    nLightDir = normalize(lightPosition - pos);
    lDim = 160.0 / (lLen * lLen);
  } else if (lt == 4) {	// Spot light
    nLightDir = normalize(lightPosition - pos);
    lCone = -dot(nLightDir, normalize(lightDirection));
    if(lCone < 0.5) {
      lDim = 0.0;
    } else if (lCone > 0.7) {
      lDim = 1.0;
    } else {
      lDim = (lCone - 0.5) / 0.2;
    }
  }
  return vec4(nLightDir, lDim);
}


void main() {
  uvFS = a_uv;
  gl_Position = matrix * vec4(a_position,1.0);
  vec3 nNormal = normalize(inNormal);

  vec4 lm = lightModel(lightType, a_position);
  vec3 nlightDirection = lm.rgb;
  float lightDimension = lm.a;

  vec4 ambLight = ambientLightColor * ambientLightInfluence;
  if (lightType == 5){
    //goureaudSpecular = vec4(0.0, 0.0, 0.0, 0.0);
    goureaudDiffuseAndAmbient = vec4(0.0, 0.0, 0.0, 1.0);
  } else {
    // Computing the diffuse component of light (Without the texture contribution)
    vec4 diffuse = lightColor * clamp(dot(nlightDirection, nNormal), 0.0, 1.0) * lightDimension;

    //goureaudSpecular = specular;
    goureaudDiffuseAndAmbient = diffuse + ambLight;
  }
}