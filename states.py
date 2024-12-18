from aiogram.fsm.state import StatesGroup, State


class Settings(StatesGroup):
    """Класс для настроек."""

    login = State()
    password = State()
    settings_data = State()
    # user_id = State()
