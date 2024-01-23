import app from './config/express';

async function main(): Promise<void> {
  try {
    
    app.listen(app.get('port'));
    console.log(`Servidor escuchando en puerto ${app.get('port')}`);
    console.log('Connection stablished');
  } catch (error) {
   
    console.log(error);
  }
}
main();
