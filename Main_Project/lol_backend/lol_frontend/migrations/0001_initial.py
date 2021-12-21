# Generated by Django 3.1.7 on 2021-05-07 17:23

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstname', models.CharField(max_length=20)),
                ('lastname', models.CharField(max_length=20)),
                ('emailid', models.EmailField(max_length=60, unique=True, verbose_name='email')),
                ('password', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='MatchDataByGameId',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('matchId', models.IntegerField()),
                ('region', models.CharField(default='br1', max_length=10)),
                ('player1', models.CharField(default='', max_length=100)),
                ('player2', models.CharField(default='', max_length=100)),
                ('player3', models.CharField(default='', max_length=100)),
                ('player4', models.CharField(default='', max_length=100)),
                ('player5', models.CharField(default='', max_length=100)),
                ('player6', models.CharField(default='', max_length=100)),
                ('player7', models.CharField(default='', max_length=100)),
                ('player8', models.CharField(default='', max_length=100)),
                ('player9', models.CharField(default='', max_length=100)),
                ('player10', models.CharField(default='', max_length=100)),
            ],
        ),
    ]
