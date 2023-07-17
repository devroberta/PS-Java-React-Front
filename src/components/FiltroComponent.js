import { NgxMaskDirective } from 'ngx-mask';
import './FiltroComponent.css'
import { useState, useEffect } from "react";

const FiltroComponent = () => {
    const [dataInicial, setDataInicial] = useState("");
    const [dataFinal, setDataFinal] = useState("");
    const [nomeOperador, setNomeOperador] = useState("");
    const [listaTransf, setListaTransf] = useState([]);
    const [loading, setLoading] = useState(false);

    const API = "http://localhost:5000"
    const saldoTotal = "50.00"
    const saldoPeriodo = "50.00"
  
    const handleSubmit = (e) => {
    }

    useEffect(() => {
        const loadData = async() => {
          setLoading(true);
          const res = await fetch(API + "/listaTranferencias")
          .then((res) => res.json())
          .then((data) => data)
          .catch((err) => console.log(err));
        
        setLoading(false);

        setListaTransf(res);
        }

        loadData()

    }, [])

    return <div className='div-principal'>
        <form className='form-filtro' onSubmit={handleSubmit}>
            <section className='section-label-input'>
                <label className='label-input' htmlFor='dataInicial'>Data de inicio</label>
                <input
                    type="text"
                    name="dataInicial"
                    placeholder="Data Inicial"
                    value={dataInicial || ""}
                    onChange={(e) => setDataInicial(e.target.value) }
                    required
                ></input>
            </section>
            <section className='section-label-input'>
                <label className='label-input' htmlFor='dataFinal'>Data de fim</label>
                <input
                    type="text"
                    name="dataFinal"
                    placeholder="Data dataFinal"
                    value={dataFinal || ""}
                    onChange={(e) => setDataFinal(e.target.value) }
                    required
                ></input>
            </section>
            <section className='section-label-input'>
                <label className='label-input' htmlFor='nomeOperador'>Nome do operador transacionado</label>
                <input
                    type="text"
                    name="nomeOperador"
                    placeholder="Nome Operador Transferencia"
                    value={nomeOperador || ""}
                    onChange={(e) => setNomeOperador(e.target.value) }
                    required
                ></input>
            </section>
        </form>

        <section className='button-pesquisar'>
            <button id='pesquisar'>Pesquisar</button>
        </section>

        <section>
        <table className="table-lista">

            <thead>
                <tr className="table-line-saldo">
                    <td>Saldo total: {saldoTotal}</td>
                    <td>Saldo no período: {saldoPeriodo}</td>
                </tr>
                <tr className="table-line-titulo">
                    <td>Dados</td>
                    <td>Valencia</td>
                    <td>Tipo</td>
                    <td>Nome do Operador Transacionado</td>
                </tr>
            </thead>

            <tbody>
                {listaTransf.map((item) => (
                    <tr className="table-colum-item" key={item.id}>
                        <td>{item.data_transferencia}</td>
                        <td>{item.valor}</td>
                        <td>{item.tipo}</td>
                        <td>{item.nome_operador_transacao}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </section>
        <section>
            <tfoot>             
                <td className="table-navegacao">1 2 3</td>
            </tfoot>
        </section>
    </div>;
}

export default FiltroComponent;