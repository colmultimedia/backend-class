
export const sqlite = {
    client: 'sqlite3',
    connection: () => ({
      filename: '../DB/messages.sqlite'
    }),
  };

export default sqlite