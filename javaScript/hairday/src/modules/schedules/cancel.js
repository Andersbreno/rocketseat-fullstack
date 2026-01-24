import { schedulesDay } from "./load.js"
import { scheduleCancel } from "../../services/cancel-schedule.js"

const periods = document.querySelectorAll(".period")

periods.forEach((period) => {
    period.addEventListener("click", async (event) => {
        if(event.target.classList.contains("cancel-icon")) {
            const item = event.target.closest("li")

            const { id } = item.dataset

            console.log("ID capturado:", id, "Tipo:", typeof id);
            
            if(id) {
                const isConfirm = confirm("Tem certeza que deseja cancelar o agendamento?")
                if(isConfirm) {
                    await scheduleCancel({ id })
                    schedulesDay()
                }
            }
        }
    })
})