#version 300 es

in vec3 a_position;
in vec2 a_uv;
in vec3 inNormal;
out vec2 uvFS;
out vec4 goureaudDiffuseAndAmbient;
out vec4 goureaudSpecular;

uniform int specularReflection;
uniform vec4 mSpecColor;
uniform float mSpecPower;

uniform vec4 ambientLightColor;
uniform float ambientLightInfluence;
uniform vec3 lightDirection;
uniform vec3 lightPosition;
uniform vec4 lightColor;
uniform int lightType;
uniform float decay;
uniform vec3 eyePosition;

uniform mat4 matrix;
uniform mat4 world_matrix;
uniform mat4 nMatrix;

vec4 lightModel(int lt, vec3 pos) {

  // The normalize light direction
  vec3 nLightDir;

  // Float to store light dimension and cone length
  float lDim, lCone;
  lDim = 1.0;

  if (lt == 1) {  		// Directional light
    nLightDir = - normalize(lightDirection);
    lDim = 0.5;
  } else if (lt == 2) {	// Point light
    nLightDir = normalize(lightPosition - pos);
  } else if (lt == 3) {	// Point light (decay)
    float lLen = length(lightPosition - pos);
    nLightDir = normalize(lightPosition - pos);
    lDim = min(decay / (lLen * lLen), 1.0);
  } else if (lt == 4) {	// Spot light
    nLightDir = normalize(lightPosition - pos);
    lCone = -dot(nLightDir, normalize(lightDirection));
    if(lCone < 0.2) {
      lDim = 0.0;
    } else if (lCone > 0.7) {
      lDim = 1.0;
    } else {
      lDim = 0.5;
    }
  }
  return vec4(nLightDir, lDim);
}


void main() {
  uvFS = a_uv;
  gl_Position = matrix * vec4(a_position,1.0);
  vec3 inNormal_n = mat3(nMatrix)*inNormal;
  vec3 world_position = (world_matrix * vec4(a_position,1.0)).xyz;
  vec3 nNormal = normalize(inNormal_n);
  vec3 nEyeDirection = normalize(eyePosition - world_position);

  vec4 lm = lightModel(lightType, world_position);
  vec3 nlightDirection = lm.rgb;
  float lightDimension = lm.a;

  vec4 ambLight = ambientLightColor * ambientLightInfluence;
  if (lightType == 5){
    goureaudSpecular = vec4(0.0, 0.0, 0.0, 0.0);
    goureaudDiffuseAndAmbient = vec4(0.0, 0.0, 0.0, 1.0);
  } else {
    // Computing the diffuse component of light, lambert
    vec4 diffuse = lightColor * clamp(dot(nlightDirection, nNormal), 0.0, 1.0) * lightDimension;
    vec4 specular;

    if (specularReflection == 1) {
      // Reflection vector for Phong model
      vec3 reflection = -reflect(nlightDirection, nNormal);
      specular = mSpecColor * lightColor * pow(clamp(dot(reflection, nEyeDirection), 0.0, 1.0), mSpecPower) * lightDimension;
    } else if (specularReflection == 0) {
      // Reflection vector for Blinn model
      vec3 hVec = normalize(nEyeDirection + nlightDirection);
      specular = mSpecColor * lightColor * pow(clamp(dot(nNormal, hVec), 0.0, 1.0), mSpecPower) * lightDimension;
    }
    goureaudSpecular = specular;
    goureaudDiffuseAndAmbient = diffuse + ambLight;
  }
}