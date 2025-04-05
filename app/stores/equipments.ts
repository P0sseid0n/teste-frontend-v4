import { defineStore } from 'pinia'

export const useEquipmentsStore = defineStore('equipments', () => {
	const { data: equipments } = useAsyncData('equipments', () =>
		$fetch('/api/equipments')
	)

	return { equipments }
})
