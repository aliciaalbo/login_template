import model
import server

model.connect_to_db(server.app, echo=True)
model.db.create_all()
