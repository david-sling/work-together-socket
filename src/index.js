const http = require("http").createServer();
const io = require("socket.io")(http, {
  cors: { origin: "*" },
});
require("dotenv").config();

const { PORT = 8000 } = process.env;

io.on("connection", (socket) => {
  console.log(`User: ${socket.id} connected`);
  socket.on("change", async ({ row, column, text, sheetId }) => {
    io.emit(sheetId, { row, column, text });
  });
});

http.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`);
});
