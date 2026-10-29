import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticipanteCard from '../components/ParticipanteCard';
import {
  listarNaRoca,
  listarForaDaRoca,
  registrarVoto,
} from '../services/votacaoService';

function Votacao() {
  const [ultimoVoto, setUltimoVoto] = useState(null);
  const [votosNaSessao, setVotosNaSessao] = useState(0);

  const naRoca = listarNaRoca();
  const foraDaRoca = listarForaDaRoca();

  function handleVotar(participante) {
    registrarVoto(participante.id);
    setUltimoVoto(participante);
    setVotosNaSessao(votosNaSessao + 1);
  }

  return (
    <main className="votacao">
      <h1>Votação</h1>

      <section>
        <h2>Na roça</h2>
        <div className="grade-roca">
          {naRoca.map((p) => (
            <ParticipanteCard
              key={p.id}
              participante={p}
              onVotar={handleVotar}
            />
          ))}
        </div>
      </section>

      {ultimoVoto !== null && (
        <p className="confirmacao">
          Voto registrado para {ultimoVoto.nome}. Você já votou {votosNaSessao}{' '}
          {votosNaSessao === 1 ? 'vez' : 'vezes'}.{' '}
          <Link to="/resultado">Ver resultado</Link>
        </p>
      )}

      <section>
        <h2>Demais peões</h2>
        <div className="grade-peoes">
          {foraDaRoca.map((p) => (
            <ParticipanteCard key={p.id} participante={p} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Votacao;
