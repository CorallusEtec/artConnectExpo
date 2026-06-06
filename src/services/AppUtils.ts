/**
 * 
 * Classe utilitária com funções que são compartilhadas entre componentes
 * 
 */

export class AppUtils {
      // Recebe quantia de data (em segundos) e converte para um texto formato para as postagens
  static labelData(seg /*Padrão inicial: Segundos*/ : number): string {
    // Objeto que abstraí os intervalos de tempos somados
    const t = {
      min: 60,
      hora: 60 * 60,
      dia: 60 * 60 * 24,
      semana: 60 * 60 * 24 * 7,
      mes: 60 * 60 * 24 * 7 * 4,
      ano: 60 * 60 * 24 * 7 * 4 * 12,
    };
    /**
     * Lógica expicada: Iniciando pelos segundos, se a quantidade de tempo na
     * unidade de tempo sucessora for menor ou igual a 0, então a unidade é a atual (no caso dessa primeira iteração, segundos).
     * Caso contrário, se compara com a próxima unidade da mesma forma a cima. Caso chegue em um valor maior ou igual a 12 meses,
     * apenas é dividido por 12, o que nos retorna a quantidade de tempo em anos do intervalo
     */

    
    if (Math.trunc(seg / t.min) <= 0) {
      return `${seg.toFixed(0)} segundos atrás`;
    } else if (Math.trunc(seg / t.hora) <= 0) {
      return `${(seg / t.min).toFixed(0)} minutos atrás`;
    } else if (Math.trunc(seg / t.dia) <= 0) {
      return `${(seg / t.hora).toFixed(0)} horas atrás`;
    } else if (Math.trunc(seg / t.semana) <= 0) {
      return `${(seg / t.dia).toFixed(0)} dias atrás`;
    } else if (Math.trunc(seg / t.mes) <= 0) {
      return `${(seg / t.semana).toFixed(0)} semanas atrás`;
    } else if (Math.trunc(seg / t.ano) <= 0) {
      return `${(seg / t.mes).toFixed(0)} meses atrás`;
    } else {
      return `${(seg / t.ano).toFixed(0)} anos atrás`;
    }
  }

  //Recebe data do parametro e retorna a diferença em segundos
    static converterData(data: Date): number {
      const dataAtual = new Date(Date.now());
      const diffMili = Math.abs(data.getTime() - dataAtual.getTime());
  
      const diffSeg = Math.ceil(diffMili / 1000);
      return diffSeg;
    }


    //function sformatar data

    static formatarData = (texto: string) => {
  
    const numeros = texto.replace(/\D/g, "");

    
    const numerosLimitados = numeros.slice(0, 8);

    if (numerosLimitados.length <= 2) {
      return numerosLimitados;
    }
    if (numerosLimitados.length <= 4) {
      return `${numerosLimitados.slice(0, 2)}/${numerosLimitados.slice(2)}`;
    }
    return `${numerosLimitados.slice(0, 2)}/${numerosLimitados.slice(2, 4)}/${numerosLimitados.slice(4, 8)}`;
  };

}