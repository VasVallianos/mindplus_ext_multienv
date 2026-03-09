\   
enum MODES {
    //% block="I2C"
    1,
    //% block="UART"
    2
}

//% color="#fd6e2a" iconWidth=50 iconHeight=40
namespace multienv {
    //% block="Αρχικοποίηση [MODE] του Multifunctional Enviromental Sensor"
	//% MODE.shadow="dropdown" MODE.options="MODES" MODE.defl="MODES.1"
    export function initMultiEnvModule(parameter: any, block: any) {
		let mode = parameter.MODE.code;
        if(Generator.board === 'arduino'){
			Generator.addInclude("SoftwareSerial","#include <SoftwareSerial.h>");
			Generator.addInclude("MultiEnv","#include <DFRobot_EnvironmentalSensor.h>");
			if (mode==1){
				Generator.addObject(`MultiEnv` ,`DFRobot_EnvironmentalSensor`,`multienvsensor(0x22,&Wire)`);	
            } else {
				Generator.addObject(`SoftwareSerial` ,`SoftwareSerial`,`envSerial(4,5)`);
				Generator.addObject(`MultiEnv` ,`DFRobot_EnvironmentalSensor`,`multienvsensor(0x22,&envSerial)`);
            }
			Generator.addSetup(`multienvsensor.begin();`);
        }
    }

    //% block="Διάβασε φωτεινότητα" blockType="reporter"
    export function getLuminousIntensity(parameter: any, block: any) {
        if(Generator.board === 'arduino'){
            Generator.addCode(`multienvsensor.getLuminousIntensity()`);
        }
    }
	
	//% block="Διάβασε θερμοκρασία" blockType="reporter"
    export function getTemperature(parameter: any, block: any) {
        if(Generator.board === 'arduino'){
            Generator.addCode(`multienvsensor.getTemperature(TEMP_C)`);
        }
    }
  
    //% block="Διάβασε σχετική υγρασία" blockType="reporter"
    export function getHumidity(parameter: any, block: any) {
        if(Generator.board === 'arduino'){
            Generator.addCode(`multienvsensor.getHumidity()`);
        }
    }
	
	//% block="Διάβασε υπεριώδη (UV) ακτινοβολία" blockType="reporter"
    export function getUltravioletIntensity(parameter: any, block: any) {
        if(Generator.board === 'arduino'){
            Generator.addCode(`multienvsensor.getUltravioletIntensity()`);
        }
    }
  
  	//% block="Διάβασε ατμοσφαρική πίεση" blockType="reporter"
    export function getAtmospherePressure(parameter: any, block: any) {
        if(Generator.board === 'arduino'){
            Generator.addCode(`multienvsensor.getAtmospherePressure(HPA)`);
        }
    }
  
    //% block="Διάβασε υψόμετρο" blockType="reporter"
    export function getElevation(parameter: any, block: any) {
        if(Generator.board === 'arduino'){
            Generator.addCode(`multienvsensor.getElevation().toFloat()`);
        }
    }
}

