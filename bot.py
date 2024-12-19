import asyncio
import json
import logging
import os

from aiogram import Bot, Dispatcher, F, types
from aiogram.filters import CommandStart
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from dotenv import find_dotenv, load_dotenv

from kb import builder, courses
from states import Settings

load_dotenv(find_dotenv())


logging.basicConfig(level=logging.INFO)


bot = Bot(os.getenv("TOKEN"))
# users = json.loads(os.getenv('ADMIN_USERS'))
dp = Dispatcher()
user = ''


@dp.message(CommandStart())
async def start(message: types.Message):
    # await message.answer(text='Привет!', reply_markup=builder.as_markup())
    await message.answer(text='Привет! Жми "Начать квест"')

@dp.message(F.content_type == types.ContentType.WEB_APP_DATA) #получаем отправленные данные 
def answer(webAppMes):
    print(webAppMes) #вся информация о сообщении
    print(webAppMes.web_app_data.data) #конкретно то что мы передали в бота
    bot.send_message(webAppMes.chat.id, f"получили инофрмацию из веб-приложения: {webAppMes.web_app_data.data}") 
    #отправляем сообщение в ответ на отправку данных из веб-приложения 

# """Тут настройка отправки сообщений преподу, с аутентификацией"""
# @dp.message(F.text == "Установить настройки")
# async def set_settings(msg: types.Message, state: FSMContext):
#     await state.set_state(Settings.login)
#     await msg.answer(text='Введи логин')


# @dp.message(Settings.login)
# async def check_user(msg: types.Message, state: FSMContext):
#     if msg.text in users:
#         message = 'Введи пароль'
#         global user
#         user = msg.text
#         await state.set_state(Settings.password)
#     else:
#         message = 'Такого пользователя нет'
#         await state.clear()
#     await msg.delete()
#     await msg.answer(message)


# @dp.message(Settings.password)
# async def check_password(msg: types.Message, state: FSMContext):
#     if msg.text == users[user]:
#         message = 'Выберите курс'
#         await state.set_state(Settings.settings_data)
#         await msg.delete()
#         await msg.answer(message, reply_markup=courses)
#     else:
#         message = 'Доступ запрещен'
#         await state.clear()
#         await msg.delete()
#         await msg.answer(message)
    

# @dp.callback_query(Settings.settings_data)
# async def get_settings_data(clb: types.CallbackQuery,
#                             state: FSMContext):
#     os.environ["COURSE"] = clb.data
#     await clb.message.answer('Настройки сохранены')
#     await state.clear()
#     print(os.getenv('COURSE'))

# @dp.message(F.content_type == ContentType.WEB_APP_DATA)
# async def parse_data(message: types.Message):
#     data = message.web_app_data.data
#     # print(data)
#     await message.answer(data)


async def main():
    await bot.delete_webhook(drop_pending_updates=True)
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
