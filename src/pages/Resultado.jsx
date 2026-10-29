import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  obterVotos,
  calcularTotalVotos,
  calcularResultado,
  zerarVotos,
} from '../services/votacaoService';

function Resultado() {
  const [votos, setVotos] = useState(() => obterVotos());

  const total = calcularTotalVotos(votos);
  const resultado = calcularResultado(votos);

  function handleZerar() {
    if (window.confirm('Apagar todos os votos?')) {
      zerarVotos();
      setVotos({});
    }
  }

  return (
    <main className="resultado">
      <h1>Resultado</h1>

      {total === 0 ? (
        <p>
          Ainda não há votos. <Link to="/votacao">Ir para a votação</Link>
        </p>
      ) : (
        <section>
          <p>Total devotos: {total}</p>

          <div className="grade-roca">
          {resultado.map((p, index) => (
            <article
              key={p.id}
              className={index === 0 ? 'placar placar-lider' : 'placar'}
            >
              {index === 0 && <span className="selo-roca">Sairia hoje</span>}
              <img src={p.foto} alt={p.nome} />
              <h3>{p.nome}</h3>
              <p>
                {p.votos} votos (
                {p.percentual.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%)
              </p>
              <div className="barra">
                <div
                  className="barra-preenchida"
                
                  style={{ width: `${p.percentual}%` }}
                />
              </div>
            </article>
          ))}
          </div>
          <button type="button" onClick={handleZerar}>
            Zerar votação
          </button>
        </section>
      )}
    </main>
  );
}

export default Resultado;
