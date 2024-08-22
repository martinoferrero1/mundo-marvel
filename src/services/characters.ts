import { Character, CharacterOriginal } from "../types"

const HASH = `4dfaa6f4e5cb993da155037080ba9b54`

export const getCharacters = async ({search}: {search: string | null}): Promise<Character[]> => {
    if (search === '') return []
    try {
        const query = search? `&nameStartsWith=${search}`: ''
        const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=c8ab8d276656753ee4b88c8234f79a08&hash=${HASH}&limit=9&${query}`)
        if (!response.ok)
            throw new Error("Error al realizar el fetch")
        const json = await response.json()
        const characters = json.data.results
        return characters?.map((character: CharacterOriginal) => ({
            id: character.id,
            name: character.name,
            thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`
        }))
    }
    catch (error) {
        console.error("Error de fetch:", error)
        throw error
    }
}