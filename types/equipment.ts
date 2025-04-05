export interface Equipment {
	equipmentModelName: string
	position: {
		date: string
		lat: number
		lon: number
	}
	state: {
		date: string
		equipmentStateId: string | number
		equipmentStateName: string
		equipmentStateColor: string
	}
	id: string
	equipmentModelId: string
	name: string
}
