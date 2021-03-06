#version 330

out vec4 outBuffer;

uniform sampler2D heightmap;
uniform sampler2D normalMap;
uniform sampler2D mountainText;
uniform vec3 lightVector;

in vec2 texCoord;
in vec3 normalView;
in vec3 eyeView;

layout(location = 0) out vec4 outRendered;

vec4 phong(vec3 myColor, float specDeg){
	const vec3 ambientColor  = vec3(0.1,0.1,0.1);
	const vec3 specular = vec3(0.9,0.9,0.9);

	// normal / view and light directions (in camera space)
	vec3 n = normalize(normalView);
	vec3 e = normalize(eyeView);
	vec3 l = normalize(lightVector);

	// diffuse and specular components of the phong shading model
	float diff = max(dot(l,n),0.0);
	float spec = pow(max(dot(reflect(l,n),e),0.0),specDeg);

	// final color 
	vec3 color = ambientColor + diff*myColor + spec*specular;
	return vec4(color,1.0);
}

void main(){

	vec4 colorTexture;
	float spec;

	float height = texture(heightmap, texCoord).z;

	if(height > 0.80){ // en haut

		colorTexture = vec4(0.9,0.9,0.9,1);
		spec = 2.0;

	} else if(height <= 0.80 && height > 0.2){ // au milieu

		colorTexture = texture(mountainText, texCoord);
		spec = 120.0;

	} else { // en bas
		colorTexture = vec4(0.0,0.4,1.0,1.0);
		spec = 200.0;

	}

	outBuffer = phong(colorTexture.rgb, spec);

	// float percentLight = max(dot(texture(normalMap, texCoord).xyz, lightVector),0);

	// outBuffer = vec4(percentLight,0,0,1);

	// outBuffer = texture(heightmap, texCoord);

	outRendered = outBuffer;
}