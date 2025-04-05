import equipments from '../../data/equipment.json'
import equipmentsModel from '../../data/equipmentModel.json'
import equipmentsState from '../../data/equipmentState.json'
import equipmentsStateHistory from '../../data/equipmentStateHistory.json'
import equipmentsPositionHistory from '../../data/equipmentPositionHistory.json'

import type { Equipment } from '@@/types/equipment'

function getEquipmentModelName(equipmentModelId: string): string {
	return (
		equipmentsModel.find(model => model.id === equipmentModelId)?.name || ''
	)
}

function getRecentPosition(equipmentId: string) {
	const equipmentPosition = equipmentsPositionHistory.find(
		position => position.equipmentId === equipmentId
	)
	return equipmentPosition?.positions[0] || { date: '', lat: 0, lon: 0 }
}

function getRecentState(equipmentId: string) {
	const stateHistory = equipmentsStateHistory.find(
		state => state.equipmentId === equipmentId
	)
	const recentState = stateHistory?.states[0]
	const state = equipmentsState.find(
		state => state.id === recentState?.equipmentStateId
	)
	return {
		date: recentState?.date || '',
		equipmentStateId: recentState?.equipmentStateId || 0,
		equipmentStateName: state?.name || '',
		equipmentStateColor: state?.color || '#000000',
	}
}

export default defineEventHandler<Equipment[]>(() => {
	try {
		const data = equipments.map(item => ({
			...item,
			equipmentModelName: getEquipmentModelName(item.equipmentModelId),
			position: getRecentPosition(item.id),
			state: getRecentState(item.id),
		}))
		return data
	} catch (error) {
		console.error('Erro ao processar os equipamentos:', error)
		throw createError({ statusCode: 500, message: 'Erro interno do servidor' })
	}
})
