# Generated by Django 5.1.6 on 2025-03-14 08:09

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserMoodSong',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mood', models.CharField(max_length=50)),
                ('song_id', models.CharField(max_length=100)),
                ('song_name', models.CharField(max_length=255)),
                ('artist', models.CharField(max_length=255)),
                ('danceability', models.FloatField()),
                ('energy', models.FloatField()),
                ('tempo', models.FloatField()),
                ('valence', models.FloatField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user')),
            ],
        ),
    ]
