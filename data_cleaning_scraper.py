#!/usr/bin/env python
# coding: utf-8

import pandas as pd
from pandas.io import sql
import mysql.connector
from mysql.connector import errorcode
from sqlalchemy import create_engine

file = '/Users/martin/Documents/Programmation/projects/scrappy/back/itemFile'

df = pd.read_json(file)

for i in range(0, len(df)):
    split_price = df['price'][i].split(' €A')
    df['price'][i] = df['price'][i].replace(df['price'][i], split_price[0].replace(',', '.'))
    
    split_distance = df['distance'][i].split(' ')
    df['distance'][i] = df['distance'][i].replace(df['distance'][i], split_distance[1])

df['distance'] = df['distance'].astype(float)
df['price'] = df['price'].astype(float)

df.to_csv('/Users/martin/Documents/Programmation/projects/scrappy/front/src/item.csv')

engine = create_engine("mysql+pymysql://{user}:{pw}@localhost/{db}"
                       .format(user="root",
                               pw="myPassword",
                               db="myDatabase"))

df.to_sql(con=engine, name='item', if_exists='replace')

