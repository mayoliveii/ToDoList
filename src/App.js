import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

function App() {

  //tarefas - state -->remover dps
  const [toDo, setToDo] = useState([])

  //estate temporário 
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  //adicionar nova tarefa
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEnt = { id: num, title: newTask, status: false }
      setToDo([...toDo, newEnt])
      setNewTask('');
    }
  }

  //Remover tarefa
  const removeTask = (id) => {
    let newTask = toDo.filter(task => task.id !== id)
    setToDo(newTask);
  }

  // Marcar tarefa como concluída
  const doneTask = (id) => {
    let newTask = toDo.map(task => {
      if (task.id === id) {
        return ({ ...task, status: !task.status })
      }
      return task;
    })
    setToDo(newTask)
  }

  // Cancelar atualização : usuário desistiu de atualizar a tarefa
  const cancelUpdate = () => {
    setUpdateData('');
  }

  // Função para atualizar a tarefa de atualização de tarefa
  const changeTask = (e) => {
    let newEnt = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEnt);
  }

  // Atualizar tarefa
  const updateTask = () => {
    let attTask = [...toDo].filter(task => task.id !== updateData.id);
    let updateList = [...attTask, updateData]
    setToDo(updateList);
    setUpdateData('')
  }
  return (

    <div className="container App">
      <h1> To do List </h1>
      <br />

      {/* Atualizar tarefa */}
      {updateData && updateData ? (
        <>
          <div className='row'>
            <div className='col'>
              <input
                value={updateData && updateData.title}
                onChange={(e) => changeTask(e)}
                className='form-control'

              />
            </div>
            <div className='col-auto'>
              <button
                onClick={updateTask}
                className='btn btn-outline-info'>Atualizar</button>
              <button
                onClick={cancelUpdate}
                className='btn btn-outline-secondary'>Cancelar</button>
            </div>
          </div>
          <br />
        </>
      ) : (
        <>
          {/* Adicionar tarefa */}
          <div className='row'>

            <div className='col'>
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className='form-control'
              />
            </div>

            <div className='col-auto'>
              <button
                onClick={addTask}
                className='btn btn-info'>
                Adicionar tarefa
              </button>
            </div>

          </div>

          <br />
        </>
      )
      }


      {/* Se não tiver nenhuma tarefa ainda: */}
      {toDo && toDo.length ? '' : 'Sem tarefas adicionadas'}
      {
        toDo && toDo
          .sort((a, b) => a.id > b.id ? 1 : -1)
          .map((task, index) => {

            return (

              <React.Fragment key={task.id}>

                <div className="col TaskInd">
                  <div className={task.status ? 'done' : ''}>
                    <span className='taskNumber'>{index + 1}</span>
                    <span className=''>{task.title}</span>

                  </div>

                  <div className='iconsEdit'>

                    <span title='Finalizada/ Não finalizada'
                      onClick={(e) => doneTask(task.id)}>
                      <FontAwesomeIcon icon={faCircleCheck} />
                    </span>

                    {task.status ? null : (
                      <span title='Editar'
                        onClick={() => setUpdateData({
                          id: task.id,
                          title: task.title,
                          status: task.status ? true : false
                        })}
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </span>
                    )}

                    <span
                      title='Excluir'
                      onClick={() => removeTask(task.id)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </span>

                  </div>
                </div>

              </React.Fragment>
            )
          })
      }
    </div >
  );
}

export default App;
