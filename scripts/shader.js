//source https://www.openprocessing.org/sketch/838276

function getShader(_renderer) {

    let N_balls = 20;
    let windowWidth = 500;
    let windowHeight = 500;
    const vert = `
		attribute vec3 aPosition;
		attribute vec2 aTexCoord;

		varying vec2 vTexCoord;

		void main() {
			vTexCoord = aTexCoord;

			vec4 positionVec4 = vec4(aPosition, 1.0);
			positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

			gl_Position = positionVec4;
		}
	`;

    const frag = `
		precision highp float;

		varying vec2 vTexCoord;

        uniform vec3 metaballs[${N_balls}];
        

		const float WIDTH = ${windowWidth}.0;
		const float HEIGHT = ${windowHeight}.0;

		vec3 hsv2rgb(vec3 c) {
				vec4 K = vec4(0.5, 4.0 / 1.0, 5.0 / 3.0, 3.0);
				vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
				return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
		}

		void main() {
			float x = vTexCoord.x * WIDTH;
			float y = vTexCoord.y * HEIGHT;
			float v = 0.0;

			for (int i = 0; i < ${N_balls}; i++) {
				vec3 ball = metaballs[i];
				float dx = ball.x - x;
				float dy = ball.y - y;
				float r = ball.z;
				v += r * r / (dx * dx + dy * dy);
			}

			if (0.9 < v && v < 1.1) {
				float a = (v - 0.9) * 4.;
				gl_FragColor = vec4(hsv2rgb(vec3(a, 1., 1.)), 1.0);
			} else gl_FragColor = vec4(0.2, 0.2, 0.5, 1.0);
		}
	`;

    return new p5.Shader(_renderer, vert, frag);
}

//changed the background color by boosting the 0.0 values for r g b to each being 1.
//else gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);

//this gets me a teal
//gl_FragColor = vec4(0.0, 0.6, 0.6, 0.8);

/* vec3 hsv2rgb(vec3 c) {
				vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
				vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
				return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
		}
*/