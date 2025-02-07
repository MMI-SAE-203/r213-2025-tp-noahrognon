import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export async function getOffres() {
    try {
        let data = await pb.collection('Maison').getFullList({
            sort: '-created',
        });

        data = data.map((maison) => {
            maison.imageUrl = pb.files.getURL(maison, maison.image);
            return maison;
        });

        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

export async function getOffre(id) {
    try {
        let data = await pb.collection('maison').getOne(id);
        data.imageUrl = pb.files.getURL(data, data.image);
        console.log("data",data);
        
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}
export async function getMaisons() {
    try {
        let data = await pb.collection('maison').getFullList(); // Vérifie que 'maison' est bien le bon nom de collection
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des maisons :", error);
        return [];
    }
}
