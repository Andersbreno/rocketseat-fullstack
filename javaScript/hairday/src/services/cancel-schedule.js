import { apiConfig } from "./api-config.js";

export async function scheduleCancel({ id }) {
    try {
        console.log("🔄 Iniciando DELETE...");
        console.log("URL:", `${apiConfig.baseURL}/schedules/${id}`);
        console.log("ID tipo:", typeof id);
        console.log("Fazendo DELETE para:", `${apiConfig.baseURL}/schedules/${id}`);
        
        await fetch(`${apiConfig.baseURL}/schedules/${id}`, {
            method: "DELETE"
        })

        alert("Agendamento cancelado com sucesso.")
    } catch (error) {
        console.log(error)
        alert("Não foi possível cancelar o agendamento")
    }
}  