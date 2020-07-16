#version 300 es

precision highp float;

in vec3 fsNormal;
in vec3 fsPosition;
in vec2 fsUVs;
out vec4 outColor;

uniform sampler2D u_texture;
uniform vec4 mDiffColor;
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

vec4 lightModel(int lt, vec3 pos) {
    vec3 nLightDir;
    float lDim, lCone;
    lDim = 1.0;

    if (lt == 1) { 			// Directional light
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

    vec3 nEyeDirection = normalize(eyePosition - fsPosition);
    vec3 nNormal = normalize(fsNormal);

    vec4 lm = lightModel(lightType, fsPosition);
    vec3 nlightDirection = lm.rgb;
    float lightDimension = lm.a;
    float textureInfluence = 1.0;

    vec4 ambLight = ambientLightColor * ambientLightInfluence;

    if (lightType == 5) {
        outColor = texture(u_texture, fsUVs);
    } else {
        // Computing the diffuse component of light
        vec4 diffuse = lightColor * clamp(dot(nlightDirection, nNormal), 0.0, 1.0) * lightDimension;
        vec4 specular;

        if (specularReflection == 1) {
            vec3 reflection = -reflect(nlightDirection, nNormal);
            specular = mSpecColor * lightColor * pow(clamp(dot(reflection, nEyeDirection), 0.0, 1.0), mSpecPower) * lightDimension;
        } else if (specularReflection == 0) {
            // Reflection vector for Blinn model
            vec3 hVec = normalize(nEyeDirection + nlightDirection);
            specular = mSpecColor * lightColor * pow(clamp(dot(nNormal, hVec), 0.0, 1.0), mSpecPower) * lightDimension;
        }
        outColor = texture(u_texture, fsUVs) + diffuse + ambLight + specular;
    }
}