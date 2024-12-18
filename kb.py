from aiogram.types import (InlineKeyboardButton, InlineKeyboardMarkup,
                           KeyboardButton)
from aiogram.utils.keyboard import ReplyKeyboardBuilder


builder = ReplyKeyboardBuilder()
builder.add(KeyboardButton(text='Установить настройки',
                           callback_data="settings"))


courses = InlineKeyboardMarkup(
    inline_keyboard=[
        [
            InlineKeyboardButton(text='Создание сайтов',
                                 callback_data='SS'),
            InlineKeyboardButton(text='Фронтенд-разработка',
                                 callback_data='FR')
        ],
        [
            InlineKeyboardButton(text='Python Start 1',
                                 callback_data='PS1'),
            InlineKeyboardButton(text='Python Start 2',
                                 callback_data='PS2')
        ],
        [
            InlineKeyboardButton(text='Python Pro 1',
                                 callback_data='PP1'),
            InlineKeyboardButton(text='Python Pro 2',
                                 callback_data='PP2')
        ]
    ], resize_keyboard=True)
