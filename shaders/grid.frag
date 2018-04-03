#version 330

out vec4 outBuffer;

uniform sampler2D heightmap;
uniform sampler2D normalMap;
uniform sampler2D mountainText;

in vec2 texCoord;

layout(location = 0) out vec4 outRendered;

void main(){

	outBuffer = texture(normalMap, texCoord);
	// outBuffer = texture(mountainText, texCoord); // c'est deguelasse
	// outBuffer = vec4(1.0,0.0,0.0,1.0);

	outRendered = outBuffer;
}